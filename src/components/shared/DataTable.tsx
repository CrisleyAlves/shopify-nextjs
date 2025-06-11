type Column<T> = {
  label: string;
  render: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  title?: string;
};

export function DataTable<T>({ columns, data = [], title }: DataTableProps<T>) {
  if (!data.length) {
    return (
      <>
        {title && <h3 className="font-extralight text-2xl mb-4">{title}</h3>}
        <p className="mb-10">No data found</p>
      </>
    );
  }

  return (
    <div className="mt-10">
      {title && <h3 className="font-extralight text-2xl mb-4">{title}</h3>}

      {/* Header row (hidden on mobile) */}
      <ul className="hidden md:grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] bg-gray-100 p-3 rounded-md mb-3">
        {columns.map((col, index) => (
          <li
            key={index}
            className="font-medium text-sm uppercase text-gray-600"
          >
            {col.label}
          </li>
        ))}
      </ul>

      {/* Data rows */}
      <ul className="flex flex-col gap-4">
        {data.map((item, rowIndex) => (
          <li
            key={rowIndex}
            className="border border-gray-200 rounded-md p-4 flex flex-col gap-2 md:grid md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:gap-4"
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="text-sm text-gray-800 break-words">
                {/* Show label above value on mobile */}
                <div className="block md:hidden text-gray-500 text-xs mb-1">
                  {col.label}
                </div>
                {col.render(item)}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
