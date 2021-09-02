export const getTitle = (title) => {
    const titleArray = title.split("");
    let j = 0;
    return titleArray.map((char, index) => {
        if (j === 6) {
            j = 0;
        }
        j++;
        return <span key={index} className={"fun" + j}>{char}</span>
    }
    );
}
