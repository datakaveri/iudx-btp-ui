import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setVehicleClass } from "@/lib/store/timeSliderSlice/timeSliderSlice";
import React, { ChangeEventHandler } from "react";

export const vehicleClasses: string[] = [
	"three-wheeler",
	"tempo-traveller",
	"small-car",
	"two-wheeler",
	"bicycle",
	"mini-truck",
	"bus",
	"people",
	"truck",
	"big-car",
	"lcv",
	"sum",
];

const VehicleClassDropdownComponent = () => {
	const vehicleClass = useAppSelector(
		(state) => state.timeSlider.vehicleClass
	);
	const dispatch = useAppDispatch();

	return (
		<div>
			<label htmlFor="vehicleClass">Select vehicle class: </label>
			<select
				value={vehicleClass}
				onChange={(event: ChangeEventHandler<HTMLSelectElement>) => {
					dispatch(setVehicleClass(event.target.value));
				}}
				name="vehicleClass"
			>
				{vehicleClasses.map((vehicleClass, index) => (
					<option key={index} value={vehicleClass}>
						{vehicleClass}
					</option>
				))}
			</select>
		</div>
	);
};

export default VehicleClassDropdownComponent;
