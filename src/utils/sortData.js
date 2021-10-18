const convertYear = (date) => date.split('/')[2];

export function sortData(data, type) {
  if (!data) {
    return;
  }

  switch (type) {
    case 'nameAscending':
      data.sort((a, b) => {
        const nameA = a?.name.toUpperCase();
        const nameB = b?.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return data;
    case 'nameDescending':
      data.sort((b, a) => {
        const nameA = a?.name.toUpperCase();
        const nameB = b?.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return data;
    case 'yearAscending':
      data.sort((a, b) => convertYear(a.date) - convertYear(b.date));
      return data;
    case 'yearDescending':
      data.sort((b, a) => convertYear(a.date) - convertYear(b.date));
      return data;
    default:
      return data;
  }
}
