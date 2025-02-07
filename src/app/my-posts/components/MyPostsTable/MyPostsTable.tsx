'use client';

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
import { useState } from 'react';

import {
  container,
  headerBar,
  tableWrapper,
  noResults,
  textAlignLeft,
  textAlignRight,
} from './MyPostsTable.css';
import useMyPostsQuery, { MyPosts } from '../../hooks/useMyPostsQuery';
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

  const { data, isLoading, error, refetch } = useMyPostsQuery({
    page: currentPage,
    count: pageSize,
  });

  const handleRecruitStatusUpdate = (experimentPostId: string, recruitStatus: boolean) => {
    if (recruitStatus) {
      setSelectedPostId(experimentPostId);
      setUpdateStatusConfirmOpen(true);
    }
  };

  const confirmRecruitStatusUpdate = () => {
    if (selectedPostId) {
      console.log(`모집 상태 변경: ${selectedPostId} → false`);
      // TODO: 모집 상태 false로 변경하는 API 호출
    }
    setUpdateStatusConfirmOpen(false);
  };

  const columns: ColumnDef<MyPosts>[] = [
    {
      accessorKey: 'title',
      header: '제목',
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
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
            style={{
              all: 'unset', // 기본 버튼 스타일 제거
              cursor: 'pointer',
              display: 'inline-flex',
            }}
          >
            <Icon icon="ToggleOn" width={32} height={18} />
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
        <div onClick={() => refetch()}>재시도 클릭</div>
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
                  검색 결과가 없습니다.
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
