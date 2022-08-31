import { ServiceTemplete } from "components/templetes";
import { Service } from "core/types";
import { FC } from "react";
import { useLocation } from "react-router";

export interface ServicePageProps {}

const service: Service = {
    name: "خدمة توصيل خضراوات من مصر الى دمشق",
    category: "الفئة",
    currency: "$",
    details:
        "سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت فيوجايت, سيد كيواي كونسيكيونتشر ماجناي سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت فيوجايت, سيد كيواي كونسيكيونتشر ماجناي",
    price: 5,
    gallery: [
        { image: "https://picsum.photos/400", title: "title" },
        { image: "https://picsum.photos/400" },
        { image: "https://picsum.photos/400" },
    ],
};

const ServicePage: FC<ServicePageProps> = () => {
    const { state } = useLocation();
    console.log(state);
    return <ServiceTemplete service={service} />;
};
export default ServicePage;
