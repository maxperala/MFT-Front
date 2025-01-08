import { RootState } from "@/state/store";
import { Image, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CurrentSlashTotalCards from "./CurrentSlashTotalCards";
import { colors_new } from "@/colors";

const TotalFoundCalculation = () => {

    const totalCards = useSelector((state: RootState) => state.cardData.cards);
    const found = useSelector((state: RootState) => state.account.user?.unlocked);
    

    return (
        <View style={style.container}>
            
            <Image source={require("@/assets/images/discovered-marker-yellow.png")} style={{width: 50, height: 50, paddingLeft: 15}}/>
            <CurrentSlashTotalCards current={found ? found.length : 0} total={totalCards ? totalCards.length : 0} color={colors_new.dirty_white} size="$5" font="Fair-Prosper" />
            

        </View>
    )


}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        
    },

})



export default TotalFoundCalculation;