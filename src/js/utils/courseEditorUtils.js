const lessonType = {
    text: 1,
    audio: 2,
    video: 3,
    html: 4,
    module: 5,
}

const isLessonType = (value, type) => value === lessonType[type];

export {
    isLessonType,
    lessonType,
}