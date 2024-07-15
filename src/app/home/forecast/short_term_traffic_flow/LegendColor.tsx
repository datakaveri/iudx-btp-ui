import styled from "@emotion/styled";
import React from "react";

interface Props {
	color: string;
}

export const LegendColor = styled.div<Props>`
	width: 10px;
	height: 10px;
	outline: 1px solid black;
	background-color: ${(props) => props.color};
	margin-right: 10px;
`;
