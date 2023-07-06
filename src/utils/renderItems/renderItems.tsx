import IApartment from "interfaces/apartments/IApartment.interface"
import ApartmentListItem from "components/ApartmentListItem/ApartmentListItem"

const renderItems = (items: IApartment[]) => {
    return (
        <>
            {items.map((item: IApartment, index: number) => {
                return <ApartmentListItem key={index} apartmentItem={item} />
            })}
        </>
    )

}

export default renderItems;