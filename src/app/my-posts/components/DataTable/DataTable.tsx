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
import * as React from 'react';

import * as styles from './DataTable.css';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '../Pagination/Pagination';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../Table/Table';

export type DataRow = {
  id: string;
  title: string;
  date: string;
  views: number;
  status: '모집 중' | '모집 완료';
};

const data: DataRow[] = [
  { id: '1', title: 'fMRI-EEG 실험', date: '2024.12.31', views: 81, status: '모집 중' },
  {
    id: '2',
    title: '강남 삼성 서울 병원 연구 참가자',
    date: '2024.12.31',
    views: 820,
    status: '모집 완료',
  },
  { id: '3', title: '스크린 인터랙션 참가자', date: '2024.12.31', views: 192, status: '모집 중' },
  { id: '4', title: '인지과학 연구 참가자', date: '2024.12.31', views: 210, status: '모집 중' },
  { id: '5', title: '심리학 실험 참가자', date: '2024.12.31', views: 134, status: '모집 완료' },
  { id: '6', title: 'VR 연구 참가자 모집', date: '2024.12.31', views: 98, status: '모집 중' },
  { id: '7', title: '사용자 경험 연구 참가자', date: '2024.12.31', views: 320, status: '모집 중' },
  { id: '8', title: '뉴로마케팅 실험 참가자', date: '2024.12.31', views: 75, status: '모집 완료' },
  { id: '9', title: '의사결정 연구 참가자', date: '2024.12.31', views: 180, status: '모집 중' },
  { id: '10', title: '데이터 분석 연구 참가자', date: '2024.12.31', views: 250, status: '모집 중' },
  { id: '11', title: 'AI 모델링 연구 참가자', date: '2024.12.31', views: 295, status: '모집 중' },
];

export const columns: ColumnDef<DataRow>[] = [
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'date',
    header: '게시 날짜',
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'views',
    header: '조회수',
    cell: ({ row }) => <div>{row.getValue('views')}</div>,
  },
  {
    accessorKey: 'status',
    header: '모집 중',
    cell: ({ row }) => {
      const status = row.getValue('status');
      return status === '모집 중' ? '토글 on' : '토글 off';
    },
  },
  {
    id: 'actions',
    header: '',
    cell: () => <div>...</div>,
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [currentPage]);

  const totalPages = Math.ceil(data.length / pageSize);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  return (
    <div className={styles.container}>
      <div className={styles.headerBar}></div>
      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.columnDef.cell
                        ? flexRender(cell.column.columnDef.cell, cell.getContext())
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className={styles.noResults}>
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
              }
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
              if (currentPage < totalPages) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}
