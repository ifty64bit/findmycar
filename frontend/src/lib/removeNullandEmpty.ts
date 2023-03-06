type ObjectParam = {
    [key: string]: any;
};

const deleteNullAndEmpty = (obj: ObjectParam): ObjectParam => {
    let result: ObjectParam = {};

    for (let key in obj) {
        if (obj[key] !== null && obj[key] !== "") {
            if (typeof obj[key] === "object") {
                result[key] = deleteNullAndEmpty(obj[key]);
            } else {
                result[key] = obj[key];
            }
        }
    }

    return result;
};

export default deleteNullAndEmpty;
