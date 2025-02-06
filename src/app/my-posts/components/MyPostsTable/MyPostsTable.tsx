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
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Table/Table';

import Icon from '@/components/Icon';

export const columns: ColumnDef<MyPosts>[] = [
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
      const recruitStatus = row.getValue('recruitStatus');
      return recruitStatus ? (
        <Icon icon="ToggleOn" width={32} height={18} cursor="pointer" />
      ) : (
        <Icon icon="ToggleOff" width={32} height={18} cursor="pointer" />
      );
    },
    size: 68,
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <div>
        <Icon icon="MenuDots" width={16} height={16} cursor="pointer" />
      </div>
    ),
    size: 32,
  },
];

const MyPostsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error, refetch } = useMyPostsQuery({
    page: currentPage,
    count: pageSize,
  });

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
    </div>
  );
};

export default MyPostsTable;
