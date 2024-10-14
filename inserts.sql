DROP TABLE IF EXISTS answerstack_thread_members,
answerstack_posts,
answerstack_threads,
answerstack_users,
answerstack_flairs,
answerstack_comments,
answerstack_comment_votes,
answerstack_post_flairs,
answerstack_post_votes
  CASCADE;

INSERT INTO answerstack_threads (name, description, thread_image, thread_banner, created_at) VALUES
('FPSAimTrainer', 
 'The world’s best aim trainer, trusted by top pros, streamers, and players like you. Upgrade your FPS skills with over 25,000 player-created scenarios, infinite customization, cloned game physics, coaching playlists, and guided training and analysis. Become a human aimbot! https://store.steampowered.com/app/824270/', 
 'https://utfs.io/f/W3VPmidSNmjMYJCX4mKHkOQB0viDZpPCX1qa5cdWF69RShzA', 
 'https://utfs.io/f/W3VPmidSNmjMVDtcHceCWKqiZwCLnpVBND1Qf5uar7lMRzko', 
 CURRENT_TIMESTAMP
  ),
 
('Mouse Review', 
 'The largest online community for computer mouse peripherals and accessories!', 
 'https://utfs.io/f/W3VPmidSNmjMmz8zdVOZrp9Ihk3tRFMQgbuwHOcmKJyeqvj4', 
 'https://utfs.io/f/W3VPmidSNmjM3c9RVb0crmbVTChKPsWSEdYFtZBewNqkDagO', 
 CURRENT_TIMESTAMP
 ),

('Monitors', 
 'Home of the computer component that you see most. This subreddit is for News, Reviews, or high quality discussions related to Monitors and Display Technologies. Technical Support and Purchasing Advice questions should go to /r/buildapc https://discord.gg/ultrawide.', 
 'https://utfs.io/f/W3VPmidSNmjMV9cqcnCWKqiZwCLnpVBND1Qf5uar7lMRzkoy', 
 'https://utfs.io/f/W3VPmidSNmjM3c9RVb0crmbVTChKPsWSEdYFtZBewNqkDagO', 
 CURRENT_TIMESTAMP 
 )
 
 