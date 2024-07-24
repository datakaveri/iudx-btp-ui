import React, { FC } from "react";

import styles from "./styles.module.css";

interface Props {
	label: string;
}

const TopLabel = ({ label }: Props) => {
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
