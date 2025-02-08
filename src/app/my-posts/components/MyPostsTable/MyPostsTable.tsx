'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useState } from 'react';

import {
  container,
  headerBar,
  tableWrapper,
  noResults,
  textAlignLeft,
  textAlignRight,
} from './MyPostsTable.css';
import useMyPostsQuery, { MyPosts, UseMyPostsQueryResponse } from '../../hooks/useMyPostsQuery';
import useUpdateRecruitStatusMutation from '../../hooks/useUpdateRecruitStatusMutation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '../Pagination/Pagination';
import PostActionsPopover from '../PostActionsPopover/PostActionsPopover';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Table/Table';

import Icon from '@/components/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';

const pageSize = 10;

const MyPostsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [updateStatusConfirmOpen, setUpdateStatusConfirmOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch: refetchMyPosts,
  } = useMyPostsQuery({
    page: currentPage,
    count: pageSize,
  });

  /* 모집 상태 변경 */
  const { mutateAsync: updateRecruitStatusMutation } = useUpdateRecruitStatusMutation();

  const handleRecruitStatusUpdate = (experimentPostId: string, recruitStatus: boolean) => {
    if (recruitStatus) {
      setSelectedPostId(experimentPostId);
      setUpdateStatusConfirmOpen(true);
    }
  };

  const confirmRecruitStatusUpdate = () => {
    if (!selectedPostId) return;

    // todo 정렬 기능 추가시 변경
    const queryKey = ['myPosts', currentPage, pageSize, 'DESC'];

    const previousData = queryClient.getQueryData<UseMyPostsQueryResponse>(queryKey);

    queryClient.setQueryData<UseMyPostsQueryResponse>(queryKey, (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        content: oldData.content.map((post) =>
          post.experimentPostId === selectedPostId ? { ...post, recruitStatus: false } : post,
        ),
      };
    });

    updateRecruitStatusMutation(
      { postId: selectedPostId },
      {
        onSuccess: () => {
          refetchMyPosts();
          setUpdateStatusConfirmOpen(false);
        },
        onError: () => {
          if (previousData) {
            queryClient.setQueryData(queryKey, previousData);
          }
        },
      },
    );

    setUpdateStatusConfirmOpen(false);
  };

  const columns: ColumnDef<MyPosts>[] = [
    {
      accessorKey: 'title',
      header: '제목',
      cell: ({ row }) => {
        const experimentPostId = row.original.experimentPostId;
        return (
          <Link
            href={`/post/${experimentPostId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ width: '100%', height: '100%', padding: '1rem 0' }}>
              {row.getValue('title')}
            </div>
          </Link>
        );
      },
      size: 592,
    },
    {
      accessorKey: 'uploadDate',
      header: '게시 날짜',
      cell: ({ row }) => <div>{row.getValue('uploadDate')}</div>,
      size: 108,
    },
    {
      accessorKey: 'views',
      header: '조회수',
      cell: ({ row }) => <div>{row.getValue('views')}</div>,
      size: 80,
    },
    {
      accessorKey: 'recruitStatus',
      header: '모집 중',
      cell: ({ row }) => {
        const recruitStatus = Boolean(row.getValue('recruitStatus'));

        const experimentPostId = row.original.experimentPostId;
        return recruitStatus ? (
          <button
            onClick={() => {
              handleRecruitStatusUpdate(experimentPostId, recruitStatus);
            }}
          >
            <Icon icon="ToggleOn" width={32} height={18} cursor="pointer" />
          </button>
        ) : (
          <Icon icon="ToggleOff" width={32} height={18} />
        );
      },
      size: 68,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const experimentPostId = row.original.experimentPostId;

        return <PostActionsPopover experimentPostId={experimentPostId} />;
      },
      size: 32,
    },
  ];

  const table = useReactTable({
    data: data?.content ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
    columnResizeMode: 'onChange',
  });

  if (isLoading) return <div style={{ height: '40rem' }}>로딩 중...</div>;
  if (error)
    return (
      <div style={{ height: '40rem' }}>
        에러 발생: {error.message}
        <div onClick={() => refetchMyPosts()}>재시도 클릭</div>
      </div>
    );

  const totalPages = Math.ceil((data?.totalCount ?? 0) / pageSize);

  return (
    <div className={container}>
      <div className={headerBar}></div>
      <div className={tableWrapper}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isLeftAlign =
                    header.column.id === 'title' || header.column.id === 'recruitStatus';
                  return (
                    <TableHead
                      key={header.id}
                      className={isLeftAlign ? textAlignLeft : textAlignRight}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <tr style={{ height: '1.2rem' }} />
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const isLeftAlign =
                      cell.column.id === 'title' || cell.column.id === 'recruitStatus';
                    return (
                      <TableCell
                        key={cell.id}
                        className={isLeftAlign ? textAlignLeft : textAlignRight}
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {cell.column.columnDef.cell
                          ? flexRender(cell.column.columnDef.cell, cell.getContext())
                          : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className={noResults}>
                  작성한 글이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) setCurrentPage((prev) => prev - 1);
            }}
          />
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(index + 1);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            onClick={() => {
              if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
            }}
          />
        </PaginationContent>
      </Pagination>

      {/* 모집 상태 변경 ConfirmModal */}
      <ConfirmModal
        isOpen={updateStatusConfirmOpen}
        onOpenChange={setUpdateStatusConfirmOpen}
        confirmTitle={`모집 완료를 누르면 \n 다시 모집 상태를 바꿀 수 없어요`}
        cancelText="닫기"
        confirmText="변경하기"
        onConfirm={confirmRecruitStatusUpdate}
      />
    </div>
  );
};

export default MyPostsTable;
