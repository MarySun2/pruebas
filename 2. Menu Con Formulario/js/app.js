    document.getElementById('imageSelector').addEventListener('change', function() {
    var selectedValue = this.value;
    document.getElementById('displayImage').src = selectedValue;
    });