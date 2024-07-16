import React, { FC } from "react";

import styles from "./styles.module.css";

interface Props {
	label: string;
	value: string;
}

const TopLabel = ({ label, value }: Props) => {
	return (
		<div className={styles.kSideBySideTopBox}>
			<div className={styles.kSideBySideTopBoxLabel}>
				<span className={styles.kSideBySideTopBoxLabelSpan}>
					{label}
				</span>
			</div>
		</div>
	);
};

export default TopLabel;
