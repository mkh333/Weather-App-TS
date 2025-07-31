type LoadingProps = {
    size: "small" | "medium" | "large";
    tip: string;
}

const Loading = ({ size, tip }: LoadingProps) => {
    const sizeStyles: Record<LoadingProps['size'], string>  = {
        small: 'h-4 w-4 border-2',
        medium: 'h-6 w-6 border-4',
        large: 'h-10 w-10 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-600">
            <div className={`animate-spin rounded-full border-t-transparent border-solid border-gray-400 ${sizeStyles[size]}`}/>
            <p className="text-sm text-gray-600">{tip}</p>
        </div>
    );
};

export default Loading;
