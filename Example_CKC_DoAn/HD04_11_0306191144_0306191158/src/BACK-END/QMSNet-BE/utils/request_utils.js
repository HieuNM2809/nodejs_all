const getFilter = (req) => req?.body?.filter?.reduce((prev, next) => {
    if (next.operator === 'LIKE') {

        return {
            ...prev,
            [next.type]: {
                $regex: next.name,
                $options: 'i'
            }
        }
    } else if (next.operator === 'EQUAL') {



        return {
            ...prev,
            [next.type]: next.name
        }
    } else if (next.operator === 'IN') {
        return {
            ...prev,
            [next.type]: {
                $gte: new Date(next.name?.start),
                $lt: next.name?.end ? new Date(next.name?.end) : new Date()
            }
        }
    }


}, {})


module.exports = {
    getFilter
}