export const dateFormated = (dateString: string): string => {
	const Day = [
	  "Воскресенье",
	  "Понедельник",
	  "Вторник",
	  "Среда",
	  "Четверг",
	  "Пятница",
	  "Суббота",
	];
	let now = new Date();
	let date = new Date(Date.parse(dateString));
	let differenceDate = now.getDate() - date.getDate();

  
	let day =
	  differenceDate === 0
		? "Сегодня"
		: differenceDate === 1
		? "Вчера"
		: Day[date.getDay()];
  
	let hours = date.getHours();
	let minutes = date.getMinutes()<10
	?`0${date.getMinutes()}`
	:date.getMinutes();
	return `${day}, ${hours}:${minutes}`;
  };
  