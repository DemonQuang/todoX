
const filterOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'active', label: 'Đang hoạt động' },
    { value: 'completed', label: 'Hoàn thành' },
];

const options = [{
    value: "today",
    label: "Hôm nay"
}, {
    value: "thisWeek",
    label: "Tuần này"
}, {
    value: "thisMonth",
    label: "Tháng này"
}, {
    value: "all",
    label: "Tất cả"
}];

const visibilityOptions = 4;

export { filterOptions, options, visibilityOptions };