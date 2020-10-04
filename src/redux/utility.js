// This file has some utility function to avoid typing similar things in the reducer

export const updateObject = (oldObject, newProperties) => {
    return {
        ...oldObject,
        ...newProperties
    }
}