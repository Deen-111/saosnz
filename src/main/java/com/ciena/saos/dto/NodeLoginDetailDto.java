//package com.ciena.saos.dto;
//
//import java.io.Serializable;
//import java.util.List;
//
//import com.ciena.saos.entity.NodeLoginDetail;
//
//import lombok.Data;
//
//@Data
//public class NodeLoginDetailDto implements Serializable {
//
//    private static final long serialVersionUID = 1L;
//
//    private List<NodeLoginDetail> nodeLoginDetails;
//    private boolean isLastPage;
//}
package com.ciena.saos.dto;
import com.ciena.saos.entity.NodeLoginDetail;
import java.io.Serializable;
import java.util.List;

public record NodeLoginDetailDto(List<NodeLoginDetail> nodeLoginDetails, boolean lastPage) implements Serializable {

    private static final long serialVersionUID = 1L;
}
