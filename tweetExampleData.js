const asset = {
    tweetBody: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, amet distinctio! Ab autem nam harum dolorem rem? Laboriosam ullam iusto esse enim sequi? Voluptas quod at quisquam nostrum laudantium aspernatur."
}

module.exports = [
    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: 0},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(NEUTRAL) ${asset.tweetBody}`,
        user_name: "User_01",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },
    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: -1},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(NEGATIVE) ${asset.tweetBody}`,
        user_name: "User_02",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },
    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: 1},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(POSITIVE) ${asset.tweetBody}`,
        user_name: "USER_03",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },
    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: -1},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(NEGATIVE) ${asset.tweetBody}`,
        user_name: "USER_04",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },
    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: -1},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(NEGATIVE) ${asset.tweetBody}`,
        user_name: "USER_05",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: 0},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(NETURAL) ${asset.tweetBody}`,
        user_name: "USER_06",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: 1},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(POSITIVE) ${asset.tweetBody}`,
        user_name: "USER_07",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: 1},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(POSITIVE) ${asset.tweetBody}`,
        user_name: "USER_08",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: -1},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(NEGATIVE) ${asset.tweetBody}`,
        user_name: "USER_09",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: 1},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(POSITIVIE) ${asset.tweetBody}`,
        user_name: "USER_10",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    },    {
        // score: sentiment(tweet).score,
        searchTerm: "test:term",
        timeStamp: "test:time",
        sentimentDataObject: {score: 0},
        // if tweet has been retweeted, its full text lives in the retweeted_status object
        tweetBody: `(NETURAL) ${asset.tweetBody}`,
        user_name: "USER_11",
        user_location: "test:location",
        avatar_url: "./images/twitter-profile.jpeg"
    }
]
   