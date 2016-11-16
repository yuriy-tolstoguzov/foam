CLASS({
  name: 'TestModel',
  package: 'test',
  javaClassImports: [
    'java.util.ArrayList',
    'java.util.Date',
  ],
  requires: [
    'test.JsonTest',
    'test.JsonTestSubProp',
  ],
  methods: [
    {
      name: 'main',
      args: [
        {
          name: 'args',
          javaType: 'String []',
        },
      ],
      isStatic: true,
      javaCode: function() {/*
        JsonTestSubProp subProp1 = new JsonTestSubProp();
        subProp1.setStringProp("SubProp1");
        subProp1.setIntProp(1);
        subProp1.setLongProp(1);

        JsonTestSubProp subProp2 = new JsonTestSubProp();
        subProp2.setStringProp("SubProp2");
        subProp2.setIntProp(2);
        subProp2.setLongProp(2);

        JsonTestSubProp subProp3 = new JsonTestSubProp();
        subProp3.setStringProp("SubProp3");
        subProp3.setIntProp(3);
        subProp3.setLongProp(3);

        ArrayList<JsonTestSubProp> fobjectArray = new ArrayList<>();
        fobjectArray.add(subProp1);
        fobjectArray.add(subProp2);

        ArrayList<String> stringArray = new ArrayList<>();
        stringArray.add("Hello");
        stringArray.add("World");

        JsonTest o = new JsonTest();
        o.setStringProp("Hello");
        o.setIntProp(123);
        o.setLongProp(1234);
        o.setDateProp(new Date(12345));
        o.setStringArrayProp(stringArray);
        o.setFobjectArrayProp(fobjectArray);
        o.setFobjectProp(subProp3);
        o.setEnumProp(test.JsonTestEnum.WORLD);

        System.out.println(o.toJson());

        JsonTest o2 = new JsonTest();
        assertTrue(!o.equals(o2));

        o2.fromJson(o.toJson());
        assertTrue(o.equals(o2));
        assertTrue(o.toJson().equals(o2.toJson()));
      */},
    },
    {
      name: 'assertTrue',
      args: [
        {
          name: 'value',
          type: 'Boolean',
        },
      ],
      isStatic: true,
      javaCode: function() {/*
        if (!value) {
          System.out.println("Error");
          Thread.currentThread().dumpStack();
        }
      */},
    },
  ],
});
