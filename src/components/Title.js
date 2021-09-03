export const getTitle = (title) => {
    const titleArray = title.split("");
    let classIdentifier = 0;
    return titleArray.map((char, index) => {
        if (classIdentifier === 6) {
            classIdentifier = 0;
        }
        classIdentifier++;
        return <span key={index} className={"fun" + classIdentifier}>{char}</span>
    }
    );
}
