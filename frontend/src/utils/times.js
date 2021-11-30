const time = {
    between(interval, time){
        const [start,end] = interval;
        return start<=time && end>=time;
    },
    included(intervalA,intervalB){
        const [startB,endB] = intervalB;
        return this.between(intervalA, startB) && this.between(intervalA, endB);
    },
    merge(intervals, interval){
        for (const i of intervals) {
            if(this.included(i,interval))return intervals;
        }
        let newIntervals = intervals.filter(i=>this.included(interval,i));
        let idxIntervalStart = newIntervals.findIndex(i=>this.between(i, interval[0]));
        let idxIntervalEnd = newIntervals.findIndex(i=>this.between(i, interval[1]));
        let newInterval = interval;
        if(idxIntervalStart>-1){
            newInterval = [newIntervals[idxIntervalStart][0],newInterval[1]];
        }
        if(idxIntervalEnd>-1){
            newInterval = [newInterval[0],newIntervals[idxIntervalEnd][1]];
        }
        newIntervals = newIntervals.filter((interval,idx)=> idx != idxIntervalStart && idx != idxIntervalEnd);
        let newIdx = 0;
        while (newIdx < newIntervals.length && newIntervals[newIdx][0] < newInterval[0]){
            newIdx++;
        }
        newIntervals.splice(newIdx, 0, newInterval);
        return newIntervals;
    }
}

export default time;