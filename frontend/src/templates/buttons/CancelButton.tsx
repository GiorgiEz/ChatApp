

export function CancelButton({onClickHandler} : {onClickHandler: any}) {
    return (
        <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-lg text-xl"
            onClick={onClickHandler}>
            Cancel
        </button>
    )
}