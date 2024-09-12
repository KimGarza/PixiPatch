import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

export default function BannerAd() {
  return (
    <View style={{ flex: 1 }}>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        onDidFailToReceiveAdWithError={(error) => console.log(error)}
      />
    </View>
  );
}
