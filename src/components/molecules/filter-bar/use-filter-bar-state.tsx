import { ICategory, ISubCategory } from "core/types";
import { useState } from "react";

export function useFilterBarState() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>(
        {} as ICategory,
    );
    const [selectedSubCategory, setSelectedSubCategory] =
        useState<ISubCategory>({} as ISubCategory);
    return {
        categories,
        setCategories,
        subCategories,
        setSubCategories,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
    };
}
