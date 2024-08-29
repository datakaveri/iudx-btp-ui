import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setShortTermTrafficFlowVehicleClass } from "@/lib/store/timeSliderSlice/timeSliderSlice";
import React, { ChangeEventHandler } from "react";

import styles from "./styles.module.css";

export const shortTermTrafficFlowVehicleClasses: string[] = [
	"Bus",
	"Car",
	"Auto",
	"Bike",
	"Total",
];

const VehicleClassDropdown = () => {
	const vehicleClass = useAppSelector(
		(state) => state.timeSlider.shortTermTrafficFlowVehicleClass
	);
	const dispatch = useAppDispatch();

	return (
		<div className={styles.kVehicleClassDropdown}>
			<label htmlFor="vehicleClass">Select vehicle class: </label>
			<select
				value={vehicleClass}
				onChange={(event: ChangeEventHandler<HTMLSelectElement>) => {
					dispatch(
						setShortTermTrafficFlowVehicleClass(event.target.value)
					);
				}}
				name="vehicleClass"
			>
				{shortTermTrafficFlowVehicleClasses.map(
					(vehicleClass, index) => (
						<option key={index} value={vehicleClass}>
							{vehicleClass}
						</option>
					)
				)}
			</select>
		</div>
	);
};

export default VehicleClassDropdown;
