export const useDate = () => {
  const format = (date: Date) =>
    new Intl.DateTimeFormat('EN-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);

  return { format };
};
