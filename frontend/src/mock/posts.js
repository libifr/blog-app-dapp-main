export const posts = [
  {
    _id: 1,
    title: "Node JS Best Practices — 2023",
    content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor omnis blanditiis laboriosam perferendis, suscipit atque labore incidunt dolorem id! Delectus cum aliquam facere saepe cumque voluptatibus doloremque laboriosam tempore, deleniti totam et maxime dignissimos fugit, eum ipsam perferendis suscipit natus veritatis eius! Porro error nostrum beatae a voluptas quia modi cumque soluta nisi animi aperiam aut, perferendis minima blanditiis facilis saepe vitae ab? Vero quas illum dolore, modi inventore enim, eaque voluptatibus laborum non ipsa cumque illo sunt odio quidem iure qui, expedita quae! In eligendi explicabo totam eum odit quibusdam labore dolore, sit tempore culpa aspernatur velit tempora esse vero doloremque amet illo dolorem facilis voluptates animi facere maxime cupiditate provident temporibus. Omnis hic qui, repellendus incidunt necessitatibus odit nisi aspernatur neque autem? Facilis, possimus ipsa dolorum a sapiente ea rerum. Cumque facilis velit nostrum labore libero ut unde voluptatibus tenetur dolor alias, aspernatur impedit ipsum eligendi ab, magni quis et adipisci, repellat totam fugit similique ipsam aliquid. Deserunt laudantium quod ipsam eaque, quae accusantium corporis quisquam assumenda nesciunt? Amet tempore, ratione excepturi, magni pariatur laboriosam quasi laborum modi ipsam ex delectus ipsum maxime animi aperiam nulla distinctio sunt sint aut consequuntur voluptates exercitationem voluptatum facere ipsa. Repudiandae, assumenda. Dolorem ullam, corrupti itaque animi iste fugit veniam soluta sapiente praesentium excepturi! Cupiditate voluptatibus ex facere pariatur. In architecto vitae, temporibus dicta, fugit quisquam voluptatibus ea error suscipit explicabo fugiat inventore recusandae eligendi odio. Odit, iusto placeat repellendus obcaecati modi excepturi perferendis voluptatem vitae quaerat molestias voluptates sit qui vero adipisci animi laboriosam veritatis? Beatae delectus consequatur qui autem suscipit hic aspernatur quae veritatis quibusdam error, explicabo similique rerum dignissimos iste possimus iure pariatur commodi aliquid harum cum repellendus libero, assumenda est deserunt? Fugit corporis numquam totam voluptatum enim veniam nemo aliquam nihil hic qui eaque unde libero dolor ea eum magnam corrupti harum veritatis ab voluptatibus quo excepturi, consectetur officiis. Ipsum reiciendis accusantium tempore incidunt ex quas? Odio repudiandae asperiores enim ab blanditiis deleniti vel quidem voluptatum architecto mollitia hic, dolorem minus doloremque sit consequatur exercitationem eveniet atque distinctio vero, tempore corrupti totam omnis aut placeat! Delectus quaerat explicabo illo, omnis laudantium eligendi laboriosam dolorem? Quos a dolores eos cupiditate praesentium dignissimos beatae ut? Quia expedita hic sapiente quod voluptas accusamus sit libero ut distinctio architecto, quisquam corporis, soluta magnam molestiae adipisci et voluptate modi ipsa incidunt nihil. Ipsum perferendis quos itaque dolores minima. Exercitationem, distinctio? Ipsum atque quod at optio voluptatum asperiores adipisci quam illum, inventore dolorum dignissimos recusandae eum provident id sapiente accusantium nulla odit fuga possimus! Consequuntur doloremque eius fugit numquam! Similique quasi quisquam expedita placeat voluptate rerum eos nihil? Molestias molestiae odit maxime, amet sequi magni aperiam dolorum at nostrum sapiente alias nam consectetur praesentium mollitia, quas reiciendis explicabo ducimus? Dolorem deleniti, at minima obcaecati facere earum, numquam, voluptatum fugit porro repudiandae eveniet beatae atque animi? Dolores necessitatibus, error animi eaque esse, autem neque omnis perferendis harum veritatis culpa laboriosam officiis facilis est, fugit placeat accusamus aperiam incidunt ex nesciunt dolorem nisi. Delectus, voluptatum fugiat.`,
    image: "https://source.unsplash.com/random/800x600",
    user: {
      name: "John Duo",
      avatar: "https://avatars.githubusercontent.com/u/56452822"
    },
    date: "14 April",
    status: "Pending",
    metadata: {
      tags: ["Node", "Full stack"],
      duration: "5 min"
    },
    comments: [
      {
        _id: 1,
        user: {
          name: "John Duo",
          avatar: "https://avatars.githubusercontent.com/u/56452822"
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
        date: "14 April"
      },
      {
        _id: 2,
        user: {
          name: "John Duo",
          avatar: "https://avatars.githubusercontent.com/u/56452822"
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
        date: "14 April"
      }
    ]
  }
];

export const comments = [
  {
    _id: 1,
    user: {
      name: "John Duo",
      avatar: "https://avatars.githubusercontent.com/u/56452822"
    },
    post: {
      _id: 1,
      title: "Node JS Best Practices — 2023"
    },
    comment: "Quisquam, quae.",
    date: "14 April"
  },
  {
    _id: 2,
    user: {
      name: "John Duo",
      avatar: "https://avatars.githubusercontent.com/u/56452822"
    },
    post: {
      _id: 1,
      title: "Node JS Best Practices — 2023"
    },
    comment: "Nice post, I will try it out",
    date: "14 April"
  }
];

export const users = [
  {
    _id: 1,
    name: "John Duo",
    avatar: "https://avatars.githubusercontent.com/u/56452822",
    role: "Admin",
    email: "john@email.com"
  }
];
