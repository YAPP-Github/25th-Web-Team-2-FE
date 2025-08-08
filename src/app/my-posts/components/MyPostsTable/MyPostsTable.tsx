'use client';

import { UseQueryResult } from '@tanstack/react-query';
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
import { Dispatch, SetStateAction, useState } from 'react';

import {
  container,
  headerBar,
  tableWrapper,
  noResults,
  textAlignLeft,
  textAlignRight,
  tableEmptyViewLayout,
  emptyTitle,
  emptySubTitle,
  tableInfoRow,
  tableBody,
  tableRow,
  titleColumn,
} from './MyPostsTable.css';
import { MyPosts, UseMyPostsQueryResponse } from '../../hooks/useMyPostsQuery';
import useUpdateRecruitStatusMutation from '../../hooks/useUpdateRecruitStatusMutation';
import { PAGE_SIZE } from '../MyPostsContainer/MyPostsContainer';
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

import useUserInfo from '@/app/home/hooks/useUserInfo';
import { contactButton } from '@/components/Header/Header.css';
import Icon from '@/components/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import Spinner from '@/components/Spinner/Spinner';

interface MyPostsTableProps {
  myPostAPIResponse: UseQueryResult<UseMyPostsQueryResponse>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  order: 'DESC' | 'ASC';
}
const MyPostsTable = ({
  myPostAPIResponse,
  currentPage,
  setCurrentPage,
  order,
}: MyPostsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [updateStatusConfirmOpen, setUpdateStatusConfirmOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const { isLoading: isUserInfoLoading } = useUserInfo();

  const { data, isLoading, error, refetch: refetchMyPosts } = myPostAPIResponse;

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

    updateRecruitStatusMutation(
      { postId: selectedPostId, params: { page: currentPage, count: PAGE_SIZE, order } },
      {
        onSettled: () => {
          setUpdateStatusConfirmOpen(false);
        },
      },
    );
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
            <div className={titleColumn}>{row.getValue('title')}</div>
          </Link>
        );
      },
      size: 592,
    },
    {
      accessorKey: 'uploadDate',
      header: '게시 날짜',
      cell: ({ row }) => <div className={tableInfoRow}>{row.getValue('uploadDate')}</div>,
      size: 108,
    },
    {
      accessorKey: 'views',
      header: '조회수',
      cell: ({ row }) => <div className={tableInfoRow}>{row.getValue('views')}</div>,
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
          <Icon icon="ToggleOff" width={32} height={18} cursor="notAllowed" />
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

  if (isUserInfoLoading || isLoading)
    return (
      <div className={tableEmptyViewLayout}>
        <Spinner />
        <p className={emptySubTitle}>로딩중</p>
      </div>
    );

  if (!data?.content.length) {
    return (
      <div className={tableEmptyViewLayout}>
        <Icon icon="AllEmpty" width={60} height={60} />
        <p className={emptyTitle}>작성한 글이 없습니다.</p>
        <p className={emptySubTitle}>첫 번째 실험 공고를 올려 볼까요?</p>
        <Link href="/upload">
          <button className={contactButton}>공고 등록하기</button>
        </Link>
      </div>
    );
  }

  if (error)
    return (
      <div className={tableEmptyViewLayout}>
        <p className={emptyTitle} style={{ marginBottom: '2rem' }}>
          잠시 후 다시 시도해 주세요
        </p>
        <button onClick={() => refetchMyPosts()} className={contactButton}>
          재시도
        </button>
      </div>
    );

  const totalPages = Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE);

  return (
    <div className={container}>
      <div className={headerBar}></div>
      <div className={tableWrapper}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isLeftAlign = header.column.id === 'title';
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
          <TableBody className={tableBody}>
            <tr style={{ height: '1.2rem' }} />
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className={tableRow}>
                  {row.getVisibleCells().map((cell) => {
                    const isLeftAlign = cell.column.id === 'title';
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
