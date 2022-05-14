interface Props {
	size: number;
	width: number;
}

export const BlogNavRing = (props: Props): JSX.Element | null => {
	const { size, width } = props;

	const radius = (size - width) / 2;
	const circumference = Math.round(radius * 2 * Math.PI);

	return (
		<svg className="animate-spin absolute inset-0" width={size} height={size}>
			<circle
				className="stroke-gray-900 dark:stroke-white"
				strokeWidth={width}
				fill="transparent"
				stroke="red"
				strokeDashoffset={Math.round(circumference * 0.75)}
				strokeDasharray={circumference}
				r={radius}
				cx={size / 2}
				cy={size / 2}
			/>
		</svg>
	);
};
