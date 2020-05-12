

import axios from 'axios';

export async function getLatestVideo() {
    const response = await axios.get('http://fleshas.lt/php/api/youtube/data.php');
    return response.data;
}

export function diff_seconds(t2, t1) {
    var dif = t1.getTime() - t2.getTime();
    var Seconds_from_T1_to_T2 = dif / 1000;
    return Math.round(Math.abs(Seconds_from_T1_to_T2));
}