import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { options } from "@/lib/data"

export function DateTime({ dateFilter, setDateFilter }) {
    return (
        <Combobox
            items={options}
            value={dateFilter}
            onValueChange={setDateFilter}
        >
            <ComboboxInput
                value={
                    options.find(option => option.value === dateFilter)?.label || options[0].label
                }
                readOnly
            />

            <ComboboxContent>
                <ComboboxEmpty>Không có dữ liệu</ComboboxEmpty>

                <ComboboxList>
                    {(item) => (
                        <ComboboxItem
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

export default DateTime