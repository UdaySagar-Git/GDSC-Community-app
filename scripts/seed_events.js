const past_events = [
  {
    "name": "Panel Discussion",
    "description": "Join us for an engaging panel discussion featuring industry experts and thought leaders. The event will cover a wide range of topics including the latest trends in technology, innovative business strategies, and future industry developments.",
    "startDate": "2023-12-15T00:00:00Z",
    "endDate": "2023-12-15T23:59:59Z",
    "venue": "VNRVJIET",
    "image": null
  },
  {
    "name": "The Web3 Guide",
    "description": "Social3 is the first ever Web3 based social hiring platform. A decentralized 'LinkedIn' connecting web3 professionals.\n",
    "startDate": "2023-11-22T00:00:00Z",
    "endDate": "2023-11-22T23:59:59Z",
    "venue": "VNRVJIET",
    "image": null
  },
  {
    "name": "Campus Automation Contest",
    "description": "Dive into the ultimate challenge at our Campus automation contest. Join forces with creative minds to tackle real issues on campus, from streamlining schedules to enhancing campus life.",
    "startDate": "2023-12-14T00:00:00Z",
    "endDate": "2023-12-14T23:59:59Z",
    "venue": "VNRVJIET",
    "image": null
  },
  {
    "name": "Flutter Workshop",
    "description": "GDSC VNRVJIET invites you to explore the possibilities of Flutter, regardless of your expertise level.This workshop provides a comprehensive overview of Flutter, Google's UI toolkit for creating natively compiled applications for mobile, web, and desktop.",
    "startDate": "2023-12-14T00:00:00Z",
    "endDate": "2023-12-14T23:59:59Z",
    "venue": "VNRVJIET",
    "image": null
  },
  {
    "name": "GDSC Solution Challenge",
    "description": "Our GDSC chapter is launching the GDSC Solution Challenge, an annual hackathon by Google Developer Student Clubs. We're collaborating with nearby colleges for a two-tiered event, culminating in a grand final on our campus.",
    "startDate": "2024-02-23T00:00:00Z",
    "endDate": "2024-02-24T23:59:59Z",
    "venue": "Online Hackathon",
    "image": null
  },
  {
    "name": "WEBATHON 2.O",
    "description": "Webathon is a hackathon which gives you the experience of tackling real world challenges and ideate a solution to overcome them.",
    "startDate": "2024-03-24T00:00:00Z",
    "endDate": "2024-03-24T23:59:59Z",
    "venue": "VNRVJIET",
    "image": null
  }
]

const upcoming_events = [
  {
    "name": "Tensor Flow",
    "description": "Join us for an in-depth TensorFlow Workshop, where we will dive into the world of machine learning and deep learning using one of the most powerful frameworks available. This event is perfect for both beginners and advanced practitioners who want to expand their knowledge and skills in TensorFlow.",
    "venue": "VNRVJIET",
    "startDate": null,
    "endDate": null,
    "image": null
  },
  {
    "name": "Webathon3.O",
    "description": "Webathon 2024, an exciting marathon of web development, where creativity meets innovation! Whether you're a seasoned developer or a passionate beginner, this event is designed to challenge your skills, inspire new ideas, and foster collaboration.",
    "venue": "VNRVJIET",
    "startDate": null,
    "endDate": null,
    "image": null
  }
]

const { createClient } = require("@supabase/supabase-js");
const supabaseUrl ="";
const supabaseKey = "";

const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

const seed_events = async () => {
    const { data, error } = await supabase.from("events").insert(upcoming_events);
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }

    const { data: past_data, error: past_error } = await supabase.from("events").insert(past_events);
    if (past_error) {
      console.error(past_error);
    } else {
      console.log(past_data);
    }
}


seed_events().then(() => {
    console.log("Events seeded successfully");
    supabase.remove();
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
