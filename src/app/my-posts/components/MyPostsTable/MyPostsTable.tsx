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
import { useMemo, useState } from 'react';

import {
  container,
  headerBar,
  tableWrapper,
  noResults,
  textAlignLeft,
  textAlignRight,
} from './MyPostsTable.css';
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

export type DataRow = {
  id: string;
  title: string;
  date: string;
  views: number;
  recruitStatus: boolean;
};

const data: DataRow[] = [
  { id: '1', title: 'fMRI-EEG 실험', date: '2024.12.31', views: 81, recruitStatus: true },
  {
    id: '2',
    title: '강남 삼성 서울 병원 연구 참가자',
    date: '2024.12.31',
    views: 820,
    recruitStatus: false,
  },
  { id: '3', title: '스크린 인터랙션 참가자', date: '2024.12.31', views: 192, recruitStatus: true },
  { id: '4', title: '인지과학 연구 참가자', date: '2024.12.31', views: 210, recruitStatus: true },
  { id: '5', title: '심리학 실험 참가자', date: '2024.12.31', views: 134, recruitStatus: false },
  { id: '6', title: 'VR 연구 참가자 모집', date: '2024.12.31', views: 98, recruitStatus: true },
  {
    id: '7',
    title: '사용자 경험 연구 참가자',
    date: '2024.12.31',
    views: 320,
    recruitStatus: true,
  },
  { id: '8', title: '뉴로마케팅 실험 참가자', date: '2024.12.31', views: 75, recruitStatus: false },
  { id: '9', title: '의사결정 연구 참가자', date: '2024.12.31', views: 180, recruitStatus: true },
  {
    id: '10',
    title: '데이터 분석 연구 참가자',
    date: '2024.12.31',
    views: 250,
    recruitStatus: true,
  },
  { id: '11', title: 'AI 모델링 연구 참가자', date: '2024.12.31', views: 295, recruitStatus: true },
];

export const columns: ColumnDef<DataRow>[] = [
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
    size: 592,
  },
  {
    accessorKey: 'date',
    header: '게시 날짜',
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
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
      return recruitStatus === true ? (
        <Icon icon="ToggleOn" width={32} height={18} />
      ) : (
        <Icon icon="ToggleOff" width={32} height={18} />
      );
    },
    size: 68,
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <div>
        <Icon icon="MenuDots" width={16} height={16} />
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

  const paginatedData = useMemo(() => {
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
    columnResizeMode: 'onChange',
  });

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
            <div style={{ height: '1.2rem' }} />
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
};

export default MyPostsTable;
