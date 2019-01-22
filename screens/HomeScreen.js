import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  WebView
} from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 , alignItems: 'center' , justifyContent:"center" }}>
        <View style={{borderWidth:1,borderRadius:20 , overflow:"hidden" ,backgroundColor: "transparent" ,position: "absolute", height: '100%', width: '100%', zI}} >
          <WebView
            ref={ref => (this._video = ref)}
            onLoad={() => this.hideSpinner()}
            style={{ position: "absolute", height: '100%', width: '100%' }}
            javaScriptEnabled
            source={{
              html: `
              <html>
              <head>
                <link rel="stylesheet" href="https://cdn.plyr.io/3.4.8/plyr.css" />
                <style>
                  * {
                    padding: 0px;
                    margin: 0px;
                  }
                  html {
                    transform: rotate(-90deg);
                    transform-origin: left top;
                    width: 100vh;
                    height: 100vw;
                    overflow-x: hidden;
                    position: absolute;
                    top: 100%;
                    left: 0;
                  }
                  .fixed-layover {
                    position: fixed;
                    z-index: 999;
                    height: 24px;
                    width: 130px;
                    right: 12px;
                    top: 13px;
                    color: #fff;
                    background: #e4354c;
                    text-align: center;
                    padding: 5px;
                    line-height: 28px;
                    font-weight: 900;
                    font-size: 14px;
                  }
                  .background {
                    height: 100vh;
                    width: 100vw;
                    position: absolute;
                    background-image: url("https://alaaltayer.com/uploads/2019/01/video-details-767150295457121955.jpg");
                    background-position: center;
                    background-size: cover;
                  }
                  .plyr--video .plyr__control.plyr__tab-focus,
                  .plyr--video .plyr__control:hover,
                  .plyr--video .plyr__control[aria-expanded="true"] {
                    background-color: transparent;
                  }
                  .plyr--full-ui input[type="range"] {
                    color: #e4354c;
                  }
                  .plyr__control--overlaid {
                    background-color: #e4354c;
                  }
                </style>
              </head>
              <body>
                <div class="fixed-layover" hidden>عجائب و غرائب</div>
                <div class="background" onclick="play()"></div>
                <div
                  id="player"
                  data-plyr-provider="youtube"
                  data-plyr-embed-id="s1eDj2qcz_c"
                ></div>
              
                <script src="https://cdn.plyr.io/3.4.8/plyr.js"></script>
                <script>
                  function play() {
                    window.player.play();
                  }
                  const player = new Plyr("#player", {
                    title: "",
                    autoplay: true,
                    resetOnEnd: true,
                    controls: [
                      "play-large",
                      "play",
                      "progress",
                      "current-time",
                      "mute",
                      "volume",
                      "fullscreen"
                    ]
                  });
                  window.player = player;
                  document.querySelector(".plyr").hidden = true;
              
                  player.on("pause", () => {
                    document.querySelector(".fixed-layover").hidden = false;
                    // document.querySelector(".plyr").hidden = true;
                  });
                  player.on("play", () => {
                    document.querySelector(".plyr").hidden = false;
                  });
                  let first_play = true;
                  player.on("playing", () => {
                    setTimeout(
                      () => (document.querySelector(".fixed-layover").hidden = true),
                      first_play ? 3000 : 250
                    );
                    first_play = false;
                  });
                </script>
              </body>
              </html>  
  `
            }}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
            onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
          />
        </View>
      </ScrollView>
    );
  }

  onShouldStartLoadWithRequest = navigator => {
    if (
      navigator.url.indexOf("https://www.youtube.com/watch?v=s1eDj2qcz_c") ===
      -1
    ) {
      return false;
    } else {
      this._video.stopLoading(); //Some reference to your WebView to make it stop loading that URL
      return true;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b3b3b"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
