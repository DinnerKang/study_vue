
export default {
    timeForToday(value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    },

    getDate(value) {
        if(value === '') return '...';
        const date = new Date(value);
        const YYYY = date.getFullYear();
        const MM = date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth();
        const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return `${YYYY}-${MM}-${DD} ${hh}:${mm}`;
    },

    getTime(value) {
        let result = 0, mm = 0, ss = 0;
        if (value > 60) mm = Math.floor(value / 60);
        ss = Math.floor(value) - (60 * mm);
        
        if (mm < 10) mm = '0' + mm;
        if (ss < 10) ss = '0' + ss;

        result = mm + ':' + ss;
        
        return result;
    }
}