$(document).ready(function() {
    /** 登録ボタンクリック */
    $('#regist').click(function() {
        var time = new Date().getTime();
        var data = new Object();
        data.name = $('#name').val();
        data.email = $('#email').val();
        var str = JSON.stringify(data);
        //ローカルストレージ
        localStorage.setItem(time, str);
        alert("保存しました。");
        loadStorage();
    });
 
    /** データクリアボタンクリック */
    $('#clear').click(function() {
        localStorage.clear();
        alert("全てのデータを消去しました。");
        loadStorage();
    });
 
    /** リロードボタンクリック */
    $('#reload').click(loadStorage);
 
    /** ローカルストレージデータ読み込み */
    function loadStorage() {
        $("#list tbody").empty();
        var rec = "";
        for (var i=0; i<localStorage.length; i++) {
            var key = localStorage.key(i); //keyを取得
            var value = localStorage.getItem(key); //keyからJSON文字列を取得
            if (!value) {
                continue;
            }
            try {
                var data = JSON.parse(value); //JSONオブジェクトに変換
            } catch (event) {
                continue;
            }
            var date = new Date();
            date.setTime(key);
            var dateStr = date.toDateString() + " " + date.toLocaleTimeString();
            rec += "<tr id='" + key + "'><td><button class='delete' href='#'>delete</button></td>";
            rec += "<td>" + data.name + "</td>";
            rec += "<td>" + data.email + "</td>";
            rec += "<td><time datetime='" + dateStr + "'>" + dateStr + "</time></td>";
            rec += "</tr>";
        }
        $("#list tbody").append(rec);
        $('.delete').bind('click', delete_clickHandler);
    }
 
    /** 削除処理 */
    function delete_clickHandler(event) {
        var target = $(event.target).parents('tr').attr('id');
        localStorage.removeItem(target);
        alert('対象者を削除しました。');
        loadStorage();
    }
    //登録済みデータ読み込み
    loadStorage();
});