export function makeTable(data) {

    const tds = data.map((item) => (
        `
        <td>${item.ID}</td>
        <td>${item.TestCode}</td>
        <td>${item.TestName}</td>
        <td>5</td>
        <td>${item.S7}</td>
        `));
    let table = `
        <table class='table'>
            <thead>
                <tr>
                    <th>Rec ID</th>
                    <th>Test Code</th>
                    <th>Test Name</th>
                    <th>Expected</th>
                    <th>Actual</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${tds}
            </tbody>
        </table>
    `;
    return table;
}

function makeImpressionsTable(data) {
    
    const tds = data.map((item,index) => (
        `
        <tr>
        <td>${++index}</td>
        <td>${item.Country}</td>
        <td>${item.Views} (${item.Percentage}%)</td>
        </tr>
        `));
    let table = `
        <table class='table'>
            <thead>
                <tr>
                    <th>SN</th>
                    <th>Geography</th>
                    <th>Views</th>
                </tr>
            </thead>
            <tbody>
                ${tds}
            </tbody>
        </table>
    `;
    return table;
}

function makeDeviceTable(data) {
    const tds = data.map((item,index) => (
        `<tr><td>${++index}</td><td>${item.DeviceType}</td><td>${item.Clicks} (${item.Percentage}%)</td></tr>`)
        );
    let table = `
        <table class='table'>
            <thead>
                <tr>
                    <th>SN</th>
                    <th>Device OS</th>
                    <th>Clicks</th>
                </tr>
            </thead>
            <tbody>
                ${tds}
            </tbody>
        </table>
    `;
    return table;
}

export { makeDeviceTable, makeImpressionsTable }