import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import dayjs from "dayjs";
import { setSelectedDate } from "@/lib/store/timeSliderSlice/timeSliderSlice";

const DatePickerComponent = () => {
	const selectedDate = useAppSelector(
		(state) => state.timeSlider.selectedDate
	);

	const dispatch = useAppDispatch();

	const handleDatePickerChange = (event: dayjs.Dayjs) => {
		dispatch(setSelectedDate(event.format("YYYY-MM-DD")));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={["DatePicker"]}>
				<DatePicker
					format="DD MMM YYYY"
					minDate={dayjs("2024-07-10")}
					maxDate={dayjs("2024-07-10")}
					value={dayjs(selectedDate)}
					onChange={handleDatePickerChange}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
};

export default DatePickerComponent;
