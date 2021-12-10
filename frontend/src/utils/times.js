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
    },
    getSuperpositions(intervals){
        // Creating an array to recieve each interval height
        let superposition = intervals.map(()=>(null));

        // Creating an array that contains every events up/down sorted
        let events = intervals.map((interval,idx) => [[interval[0], idx],[interval[1], idx]]).flat();
        events.sort((a,b) => a[0] - b[0]);
        
        // Array to store the current height
        let heights = [];

        events.forEach(e => {
            // If the superposition is already set this is the end of the event 
            if(superposition[e[1]]!=null){
                //Then remove the height on the height array
                heights = heights.filter(x=>x!=superposition[e[1]]);
                return;
            }

            // The height of the current interval is the max height +1 
            const height = heights[heights.length-1] + 1 || 0;
            superposition[e[1]] = height;
            heights.push(height)
        });


        return superposition;
    }
}

export default time;