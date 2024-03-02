import {Text, View, StyleSheet, FlatList, Pressable} from "react-native";
import {CATEGORIES, MEALS} from "../data/dummy-data";
import MealItem from "../components/MealItem";
import {useLayoutEffect} from "react";

function MealsOverviewScreen({route, navigation}) {

    const categoryId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(categoryId) >= 0
    })

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((cat) => cat.id === categoryId).title

        navigation.setOptions({
            title: categoryTitle
        });

    }, [categoryId, navigation]);
    const renderMealItem = (itemData) => {

        const item = itemData.item

        const mealItemProps = {
            itemId: item.id,
            title: item.title,
            imageUrl:item.imageUrl,
            affordability:item.affordability,
            duration:item.duration,
            complexity:item.complexity
        }

        return   (
                <MealItem {...mealItemProps}/>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList data={displayedMeals} renderItem={renderMealItem} keyExtractor={(item) => item.id}/>
        </View>
    )
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})