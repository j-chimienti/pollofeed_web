<template>
<div>
  <div class="share-network-list">
    <ShareNetwork
      :network="twitterNetwork.network"
      :key="twitterNetwork.network"
      :url="sharing.url"
      :title="sharing.title"
      :style="{backgroundColor:  'inherit'}"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitterUser="sharing.twitterUser"
    >
      <TwitterIcon/>
    </ShareNetwork>
    <ShareNetwork
      :network="linkedinNetwork.network"
      :key="linkedinNetwork.network"
      :url="sharing.url"
      :title="sharing.title"
      :style="{backgroundColor:  'inherit'}"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
    >
      <LinkedInIcon/>
    </ShareNetwork>
    <ShareNetwork
      :network="facebookNetwork.network"
      :key="facebookNetwork.network"
      :url="sharing.url"
      :title="sharing.title"
      :style="{backgroundColor:  'inherit'}"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
    >
      <FacebookIcon/>
    </ShareNetwork>
  </div>
</div>
</template>

<script>

  import TwitterIcon from "./TwitterIcon"
  import LinkedInIcon from "./LinkedInIcon"
  import FacebookIcon from "./FacebookIcon"
  const twitterNetwork = { network: 'twitter',
    name: 'Twitter', icon: 'fab fah fa-lg fa-twitter',
    color: '#1da1f2' };

  const facebookNetwork =  { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' };

  const linkedinNetwork =   { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' };

  const redditNetwork = { network: 'reddit', name: '', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' };

  export default {
    name: "SocialShare",
    components: { FacebookIcon, LinkedInIcon, TwitterIcon},
    data () {
      return {
        twitterNetwork,
        redditNetwork,
        facebookNetwork,
        linkedinNetwork,
        sharing: {
          url: 'https://pollofeed.com',
          title: 'Feeding chickens over bitcoin lightning is so much fun!',
          // description: '',
          // quote: 'The hot reload is so fast it\'s near instant. - Evan You',
          hashtags: 'bitcoin,lightning',
          twitterUser: 'pollofeed'
        },
        networks: [
          // { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
          // { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
          // { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
          // { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
          // { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
          // { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
          // { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
          // { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
          // { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
          { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
          // { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
          // { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
          // { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
          // { network: 'quora', name: 'Quora', icon: 'fab fah fa-lg fa-quora', color: '#a82400' },
          { network: 'reddit', name: '', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
          // { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
          // { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
          // { network: 'stumbleupon', name: 'StumbleUpon', icon: 'fab fah fa-lg fa-stumbleupon', color: '#eb4924' },
          // { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
          // { network: 'messenger', name: 'Messenger', icon: 'fab fah fa-lg fa-facebook-messenger', color: '#0084ff' },
          // { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
          twitterNetwork,
          // { network: 'twitter', name: 'Twitter', icon: TwitterIcon, color: '#1da1f2' },
          // { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
          // { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
          // { network: 'weibo', name: 'Weibo', icon: 'fab fah fa-lg fa-weibo', color: '#e9152d' },
          // { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
          // { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
          // { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
          // { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' },
          // { network: 'fakeblock', name: 'Custom Network', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
        ]
      }
    }
  }
</script>

<style scoped>

  .share-network-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: auto;
  }
  a[class^="share-network-"] {
    flex: none;
    color: #FFFFFF;
    background-color: #333;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 10px 0;
  }
  a[class^="share-network-"] .fah {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    flex: 0 1 auto;
  }
  a[class^="share-network-"] span {
    padding: 0 10px;
    flex: 1 1 0%;
    font-weight: 500;
  }
</style>
