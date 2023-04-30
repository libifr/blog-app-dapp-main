import { format } from "date-fns";

export default function formatDate(date, formatString = "dd/MM/yyyy") {
  return format(new Date(date), formatString);
}
