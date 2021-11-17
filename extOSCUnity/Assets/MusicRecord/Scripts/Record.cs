using System;
using System.Collections.Generic;
using UnityEngine;
using SimpleJSON;

public class Record : MonoBehaviour {
    public string partyStartTime;
    private JSONArray timeLineData;
    private AudioSource myAudioSource;
    private long gapTimeSeconds;
    private List<AudioClip> myAudioClips;

    void Start() {
        // 获取时间线
        timeLineData = TimeLine.GetTimeLine();
        // 回放运行开始的时间减去活动开始的时间的间隔秒数
        gapTimeSeconds = DateTimeOffset.Now.ToUnixTimeSeconds() - DateTimeOffset.Parse(partyStartTime).ToUnixTimeSeconds();
        // 处理音效
        myAudioSource = gameObject.GetComponent<AudioSource>();
        myAudioSource.loop = false;
        myAudioClips = TimeLine.GetMusicClip();

    }
    private void FixedUpdate() {
        long nowDateSecond = DateTimeOffset.Now.ToUnixTimeSeconds();
        for(var i = 0; i < timeLineData.Count; i++) {
            long dateSecond = timeLineData[i]["date"];
            if(dateSecond + gapTimeSeconds == nowDateSecond) {
                string music = timeLineData[i]["music"];
                foreach(var clip in myAudioClips) {
                    if(clip.name == music) {
                        Debug.Log("Play music: " + clip.name);
                        myAudioSource.clip = clip;
                        myAudioSource.Play();
                    }
                }
            }
        }
    }
}