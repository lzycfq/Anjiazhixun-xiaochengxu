Page({

    data: {

        boolean: true,

        arr: [1, 2, 3]

    },

    EventHandle: function () {

        var bol = this.data.boolean;

        this.setData({

            boolean: !bol

        })

    }

})
