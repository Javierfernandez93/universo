import { BoxLoader } from "../../src/js/boxloader.module.js?v=2.4.9";
const GET = "GET",
  POST = "POST";
class Http {
  async call(e, a, t, o, s, n, r) {
    const l = new BoxLoader(s);
    l.setLoader().then(() => {
      $.ajax({
        async: null == r || r,
        url: e,
        data: a,
        type: n,
        dataType: "json",
        crossDomain: !0,
        beforeSend: () => {},
        complete: (e) => {
          l.closeLoader().then(() => {
            null != e.responseJSON
              ? t(e.responseJSON)
              : null != e.responseText &&
                (e.responseJSON = JSON.parse(e.responseText));
          });
        },
      });
    });
  }
  async singleCall(e, a, t, o, s, n) {
    let r = new BoxLoader();
    s = null == s || s;
    let l = {
      async: !0,
      url: e,
      loader: (o = null == o || o),
      timeOut: 1e3,
      method: n,
      dataType: "json",
      crossDomain: !0,
      loadOldObject: !0,
      data: a,
    };
    await r.setLoader();
    return $.ajax({
      url: l.url,
      data: l.data,
      type: l.method,
      dataType: l.dataType,
      crossDomain: l.crossDomain,
      beforeSend: () => {},
      complete: (e) => {},
    });
  }
  callFile(e, a, t, o, s) {
    new BoxLoader();
    let n = {
      async: !0,
      url: e,
      timeOut: 0,
      method: "POST",
      dataType: "json",
      crossDomain: !0,
      loadOldObject: !0,
      data: a,
    };
    $.ajax({
      xhr: function () {
        var e = new window.XMLHttpRequest();
        return (
          e.upload.addEventListener(
            "progress",
            function (e) {
              if (e.lengthComputable) {
                var a = (e.loaded / e.total) * 100;
                $(o).width(a + "%");
              }
            },
            !1
          ),
          e
        );
      },
      url: e,
      type: n.method,
      data: n.data,
      cache: !1,
      dataType: n.dataType,
      processData: !1,
      contentType: !1,
      success: (e, a, o) => {
        t(e);
      },
      error: (e, a, t) => {},
    });
  }
}
export { Http };
