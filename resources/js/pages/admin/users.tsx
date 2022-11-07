// @ts-nocheck
import { Link } from "@inertiajs/inertia-react";
import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  TableInstance,
  useFilters,
  useGlobalFilter,
} from "react-table";
import Layout from "../../components/Layout";
import { Pagination, Search } from "../../components/Table";
import { IUser } from "../../lib/types";
import useTitle from "../../lib/use-title";

interface IUsersProps {
  users: IUser[];
}

const Table = ({ tbl }: { tbl: TableInstance<IUser> }) => (
  <table
    {...tbl.getTableProps()}
    className="w-full mx-auto my-20 bg-gray-800 shadow-md divide-sudo divide-y text-xs font-serif"
  >
    <thead>
      {tbl.headerGroups.map((headerGroup, i) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          key={i}
          className="font-extrabold text-white uppercase bg-sudo"
        >
          {headerGroup.headers.map((column, j) => (
            <th {...column.getHeaderProps()} key={j} className="p-3">
              {column.render("Header")}
            </th>
          ))}
          <th className="p-3"></th>
        </tr>
      ))}
    </thead>
    <tbody {...tbl.getTableBodyProps()} className="divide-y divide-sudo">
      {tbl.page.map((row, i) => {
        tbl.prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={i}>
            {row.cells.map((cell, j) => {
              return (
                <td
                  {...cell.getCellProps()}
                  key={j}
                  className="p-3 text-center"
                >
                  {cell.render("Cell")}
                </td>
              );
            })}
            <td className="p-3 text-center">
              <Link
                href={`/admin/users/${row.original.id}`}
                className="bg-black/50 text-sm p-3"
              >
                View
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const Users: React.FC<IUsersProps> = ({ users }: IUsersProps) => {
  useTitle("Users");
  const data = useMemo(() => users, []);
  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID" },
      { accessor: "name", Header: "Name" },
      { accessor: "username", Header: "Username" },
      { accessor: "email", Header: "Email" },
      { accessor: "points", Header: "Points" },
      {
        id: "discord_id",
        accessor: (u: IUser) =>
          u.discord_id
            ? `@${u.discord_username}#${u.discord_discriminator}`
            : "No",
        Header: "Discord",
      },
    ],
    []
  );
  const tbl = useTable(
    { data, columns: columns as never, initialState: { pageSize: 200 } },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <Layout footer>
      <div className="px-5 py-20 home-container">
        <div className="w-full sm:min-h-screen mx-auto overflow-x-hidden">
          <Pagination tbl={tbl} />
          <Search tbl={tbl} />
          <div className="w-full overflow-x-auto">
            <Table tbl={tbl} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
