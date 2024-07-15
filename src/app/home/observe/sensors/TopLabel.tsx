import React, { FC } from "react";

import styles from "./styles.module.css";

interface Props {
	value: string;
}

const TopLabel = ({ value }: Props) => {
	return (
		<div className={styles.kSideBySideTopBox}>
			<div className={styles.kSideBySideTopBoxLabel}>
				<span className={styles.kSideBySideTopBoxLabelSpan}>
					{value}
				</span>
			</div>
		</div>
	);
};

export default TopLabel;
