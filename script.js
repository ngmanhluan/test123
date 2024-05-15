// Function to validate form inputs
function validateForm() {
    var month = document.getElementById("month").value;
    var orderDate = document.getElementById("order-date").value;
    var caseOpenDate = document.getElementById("case-open-date").value;
    var caseType = document.getElementById("case-type").value;
    var acc = document.getElementById("acc").value;
    var reason = document.getElementById("reason").value;

    
    return true;
}
// Function to add data to localStorage
function addData() {
    if (validateForm()) {
        var month = document.getElementById("month").value;
        var orderDate = document.getElementById("order-date").value;
        var caseOpenDate = document.getElementById("case-open-date").value;
        var caseType = document.getElementById("case-type").value;
        var acc = document.getElementById("acc").value;
        var reason = document.getElementById("reason").value;
        var action = document.getElementById("action").value;
        var result = document.getElementById("result").value;
        var refund = document.getElementById("refund").value;
        var status = document.getElementById("status").value;

        var newData = {
            month: month,
            orderDate: orderDate,
            caseOpenDate: caseOpenDate,
            caseType: caseType,
            acc: acc,
            reason: reason,
            action: action,
            result: result,
            refund: refund,
            status: status
        };

        var dataList = localStorage.getItem("dataList");
        dataList = dataList ? JSON.parse(dataList) : [];
        dataList.push(newData);
        localStorage.setItem("dataList", JSON.stringify(dataList));

        showData();
        clearForm();
    }
}

// Function to display data from localStorage
function showData() {
    var dataList = localStorage.getItem("dataList");
    dataList = dataList ? JSON.parse(dataList) : [];

    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    dataList.forEach(function (data, index) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.month}</td>
            <td>${data.orderDate}</td>
            <td>${data.caseOpenDate}</td>
            <td>${data.caseType}</td>
            <td>${data.acc}</td>
            <td>${data.reason}</td>
            <td>${data.action}</td>
            <td>${data.result}</td>
            <td>${data.refund}</td>
            <td>${data.status}</td>
            <td>
                <button onclick="editData(${index})" class="btn btn-warning">Edit</button>
                <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to clear form inputs
function clearForm() {
    document.getElementById("month").value = "";
    document.getElementById("order-date").value = "";
    document.getElementById("case-open-date").value = "";
    document.getElementById("case-type").value = "";
    document.getElementById("acc").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("action").value = "";
    document.getElementById("result").value = "";
    document.getElementById("refund").value = "";
    document.getElementById("status").value = "";
}

// Function to edit data
function editData(index) {
    var dataList = JSON.parse(localStorage.getItem("dataList"));
    var data = dataList[index];

    document.getElementById("month").value = data.month;
    document.getElementById("order-date").value = data.orderDate;
    document.getElementById("case-open-date").value = data.caseOpenDate;
    document.getElementById("case-type").value = data.caseType;
    document.getElementById("acc").value = data.acc;
    document.getElementById("reason").value = data.reason;
    document.getElementById("action").value = data.action;
    document.getElementById("result").value = data.result;
    document.getElementById("refund").value = data.refund;
    document.getElementById("status").value = data.status;

    // Hide Add button and show Update button
    document.getElementById("add-button").style.display = "none";
    document.getElementById("update-button").style.display = "block";

    // Save the index of the data being edited
    localStorage.setItem("editIndex", index);
}

// Function to update edited data
function updateData() {
    var month = document.getElementById("month").value;
    var orderDate = document.getElementById("order-date").value;
    var caseOpenDate = document.getElementById("case-open-date").value;
    var caseType = document.getElementById("case-type").value;
    var acc = document.getElementById("acc").value;
    var reason = document.getElementById("reason").value;
    var action = document.getElementById("action").value;
    var result = document.getElementById("result").value;
    var refund = document.getElementById("refund").value;
    var status = document.getElementById("status").value;

    var index = localStorage.getItem("editIndex");

    var dataList = JSON.parse(localStorage.getItem("dataList"));
    dataList[index] = {
        month: month,
        orderDate: orderDate,
        caseOpenDate: caseOpenDate,
        caseType: caseType,
        acc: acc,
        reason: reason,
        action: action,
        result: result,
        refund: refund,
        status: status
    };

    localStorage.setItem("dataList", JSON.stringify(dataList));

    showData();
    clearForm();

    // Hide Update button and show Add button
    document.getElementById("add-button").style.display = "block";
    document.getElementById("update-button").style.display = "none";

    // Clear editIndex from localStorage
    localStorage.removeItem("editIndex");
}

// Function to delete data
function deleteData(index) {
    var dataList = JSON.parse(localStorage.getItem("dataList"));
    dataList.splice(index, 1);
    localStorage.setItem("dataList", JSON.stringify(dataList));
    showData();
}

// Load data when page loads
document.onload = showData();
// Function to filter data by ACC
function filterData() {
    var filterACC = document.getElementById("filter-acc").value.toUpperCase();

    var dataList = JSON.parse(localStorage.getItem("dataList"));
    var filteredData = dataList.filter(function(data) {
        return data.acc.toUpperCase().indexOf(filterACC) > -1;
    });

    displayFilteredData(filteredData);
}

// Function to display filtered data
function displayFilteredData(filteredData) {
    var tableBody = document.getElementById("filter-table-body");
    tableBody.innerHTML = "";

    filteredData.forEach(function(data) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.month}</td>
            <td>${data.orderDate}</td>
            <td>${data.caseOpenDate}</td>
            <td>${data.caseType}</td>
            <td>${data.acc}</td>
            <td>${data.reason}</td>
            <td>${data.action}</td>
            <td>${data.result}</td>
            <td>${data.refund}</td>
            <td>${data.status}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to reset filter
function resetFilter() {
    document.getElementById("filter-acc").value = "";
    showData();
}

// Load data when page loads
document.onload = showData();

// Add event listener for filter button
document.getElementById("filter-button").addEventListener("click", filterData);

// Add event listener for reset button
document.getElementById("reset-button").addEventListener("click", resetFilter);


// Function to filter data by Month
function filterDataByMonth() {
    var filterMonth = document.getElementById("filter-month").value;

    var dataList = JSON.parse(localStorage.getItem("dataList"));
    var filteredData = dataList.filter(function(data) {
        return data.month === filterMonth;
    });

    displayFilteredResults(filteredData);
}

// Function to reset filter by Month
function resetFilterByMonth() {
    document.getElementById("filter-month").value = "";
    showData();
}

// Add event listener for filter button for Month
document.getElementById("filter-month-button").addEventListener("click", filterDataByMonth);

// Add event listener for reset button for Month
document.getElementById("reset-month-button").addEventListener("click", resetFilterByMonth);

// Function to display filtered results
function displayFilteredResults(filteredData) {
    var tableBody = document.getElementById("filtered-result-table-body");
    tableBody.innerHTML = "";

    filteredData.forEach(function(data) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.month}</td>
            <td>${data.orderDate}</td>
            <td>${data.caseOpenDate}</td>
            <td>${data.caseType}</td>
            <td>${data.acc}</td>
            <td>${data.reason}</td>
            <td>${data.action}</td>
            <td>${data.result}</td>
            <td>${data.refund}</td>
            <td>${data.status}</td>
        `;
        tableBody.appendChild(row);
    });
}
